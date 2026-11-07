# Mini AI Chat

My CS 121 capstone project. A small web page where you type a question and an AI model (through OpenRouter) answers it. Made with HTML, CSS and JavaScript only. No login and no backend.

## Setup
1. Get a free API key from OpenRouter.
2. Open the Netlify link (or `index.html` in a browser).
3. Paste the key, click **Save**, type a question, click **Send**.

## Model
`openrouter/free`

## localStorage usage
The key is saved in localStorage under the name `openrouter_api_key`. **Forget key** removes it from localStorage and from the variable in memory. The key is never written in my code or on GitHub.

## Completed bonuses
None yet.

## Known limitations
- Every question is treated alone (no memory of earlier questions).
- Messages disappear when the page is refreshed.
- Free models have limits and can be unavailable.

## Checks performed
(To fill in after testing)

## AI usage statement
(To fill in: which AI tools I used and how I checked and tested what they gave me)
