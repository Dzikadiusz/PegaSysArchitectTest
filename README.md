# Testing Hub

A lightweight practice app that loads a text file of questions and answers, then serves random weighted questions.

## Features

- Loads questions from a `.txt` file.
- Shows one random question at a time.
- Hides the answer until **Show Answers** is pressed.
- Lets you increase question probability (**Harder**) for more retries.
- Lets you decrease question probability (**Easier**) for fewer repeats.
- Includes a **Reset Weights** button to restore all question weights to default.
- Includes a start/end slider range to focus on specific question numbers.
- Automatically saves question weights in your browser for the same question set.

## Input format

Each question uses two lines:

```text
1: Question text with possible options
Answer: Correct answer text
```

Example:

```text
1: What is 2 + 2?
Answer: 4

2: Capital of France? A) Berlin B) Madrid C) Paris
Answer: C
```

## How to use

1. Open `index.html` in your browser.
2. Upload your `.txt` file.
3. Press **Next Random Question** to practice.
4. Press **Show Answers** to reveal the hidden answer.
5. Use **Harder** or **Easier** to tune repeat frequency.
6. Press **Reset Weights** if you want all probabilities back to default.
7. Move range sliders to limit practice to a portion of the test material.
