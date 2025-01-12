
imap_server = "imap.gmail.com"
email_address = "xyz@gmail.com"
app_password = "anisbak hb sogg"



from apscheduler.schedulers.background import BackgroundScheduler
import imaplib
import email
from email.header import decode_header
import time
from datetime import datetime, timedelta
import pytz  # Ensure pytz is installed for timezone handling


# Function to decode email headers
def decode_subject(header):
    decoded_header, encoding = decode_header(header)[0]
    if isinstance(decoded_header, bytes):
        return decoded_header.decode(encoding or "utf-8")
    return decoded_header

# Function to parse the email date and handle `(UTC)` or other extraneous text
def parse_email_date(date_str):
    try:
        # Remove extraneous parts like "(UTC)" or other trailing text
        date_str = date_str.split(' (')[0]
        # Replace `GMT` with `+0000` to match the expected format
        date_str = date_str.replace("GMT", "+0000")
        # Parse the email date
        return datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %z")
    except Exception as e:
        print(f"Error parsing date: {e}")
        return None

# Function to fetch and process the latest unseen email received in the last 30 seconds
def fetch_latest_unseen_email():
    try:
        print("Checking for the latest unseen email...")

        # Connect to the email server
        mail = imaplib.IMAP4_SSL(imap_server)
        mail.login(email_address, app_password)

        # Select the inbox
        mail.select("inbox")

        # Search for unseen emails
        status, messages = mail.search(None, "UNSEEN")
        if status != "OK" or not messages[0]:
            print("No new unseen emails.")
            return

        # Get the ID of the latest unseen email (last in the list)
        latest_email_id = messages[0].split()[-1]

        # Fetch the email content
        status, msg_data = mail.fetch(latest_email_id, "(BODY.PEEK[])")
        if status != "OK":
            print("Failed to fetch the latest unseen email.")
            return

        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])

                # Decode subject and body
                subject = decode_subject(msg["Subject"])
                body = None
                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain":
                            body = part.get_payload(decode=True).decode()
                            break
                else:
                    body = msg.get_payload(decode=True).decode()

                # Get the email timestamp and convert it to datetime
                email_date = msg["Date"]
                email_datetime = parse_email_date(email_date)
                if not email_datetime:
                    print("Failed to parse email date. Skipping.")
                    continue

                current_time = datetime.now(pytz.utc)

                # Check if the email was received within the last 30 seconds
                if current_time - email_datetime <= timedelta(seconds=30):
                    # Process the email
                    print(f"New Email Found (Received within 30 seconds):\nSubject: {subject}\nBody: {body}")
                else:
                    print("Latest unseen email is older than 30 seconds. Skipping.")

        # Log out
        mail.logout()

    except Exception as e:
        print("Error:", e)

# Function to start the email listener
def start_email_listener():
    scheduler = BackgroundScheduler()
    # Schedule the fetch_latest_unseen_email function to run every 30 seconds
    scheduler.add_job(fetch_latest_unseen_email, "interval", seconds=30)
    scheduler.start()
    print("Email listener started. Listening for new emails...")
    try:
        while True:
            time.sleep(1)  # Keep the main thread alive
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()

# Run the email listener
if __name__ == "__main__":
    start_email_listener()
