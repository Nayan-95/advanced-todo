

from huggingface_hub import InferenceClient
import json

repo_id = "rt-base-cnn"
msg = f"""
Dear [Recipient's Name],

I hope you are doing well.

I would like to assign you the task of creating the frontend for Project X. This is a key component of the project, and we need to ensure the user interface is both functional and user-friendly.

Objective: Develop the frontend of the project, ensuring smooth interaction and compatibility with the backend.
Key Responsibilities:
Design the user interface based on the wireframes and UI/UX guidelines provided.
Integrate frontend components with the backend APIs.
Ensure responsiveness and cross-browser compatibility.
Implement any additional features or changes based on feedback from the team.
Tools/Resources: You will have access to the design specifications and the necessary tools (React.js, HTML, CSS, etc.) to complete the task. Please feel free to reach out to me if you require any assistance or additional resources.

The task should be completed by February 15, 2025.

Please ensure to keep me updated on your progress. If you encounter any issues or need clarification, don't hesitate to reach out.

Thank you for your efforts, and I look forward to seeing your work.

Best regards,
[Your Name]
[Your Job Title]
[Your Contact Information]"""

llm_client = InferenceClient(
    model=repo_id,
    token="WkDjBoidQLUKuL",  # Replace with your Hugging Face API token 
    timeout=120,
)

def call_llm(inference_client: InferenceClient, prompt: str):
    response = inference_client.post(
        json={
            "inputs": prompt,
            "parameters": {
                "max_new_tokens": 500,
                "repetition_penalty": 1.2,
                "temperature": 0.7,  # Controls randomness; lower values make output more deterministic
                "top_p": 0.9  # Uses nucleus sampling to limit token selection
            },
            "task": "text-generation",
        },
    )
    try:
        return json.loads(response.decode())[0]["summary_text"]
    except KeyError:
        print("Key 'generated_text' not found in response.")
        return json.loads(response.decode())  # Return the whole response for inspection

do = f"""


Here is the email:

{msg}

from the above text summerize the task in one line
"""

response = call_llm(llm_client, do)
print(response)
