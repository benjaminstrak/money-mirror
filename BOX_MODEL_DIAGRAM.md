# CSS Box Model - Quiz Page Elements Diagram

## Complete Quiz Page Layout with Padding & Margin

```
┌─────────────────────────────────────────────────────────────┐
│                    .main-content                            │
│              padding: 16px (all sides)                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              .quiz-content                             │  │
│  │        padding: 40px 20px (top/bottom: 40px)          │  │
│  │        margin: 0 auto (centers horizontally)           │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │                                                  │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │ .question-number                         │  │  │  │
│  │  │  │ margin-bottom: 20px                      │  │  │  │
│  │  │  │ ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │ │ "QUESTION 1"                       │  │  │  │  │ ← Content
│  │  │  │ │ margin: 0                           │  │  │  │  │
│  │  │  │ └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  │                                                  │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │ .quiz-progress                           │  │  │  │
│  │  │  │ margin-bottom: 40px                      │  │  │  │
│  │  │  │ width: 100%, max-width: 360px            │  │  │  │
│  │  │  │ ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │ │ .progress-bar                       │  │  │  │  │
│  │  │  │ │ border: 2px solid white             │  │  │  │  │
│  │  │  │ │ height: 18px                        │  │  │  │  │
│  │  │  │ │ ┌────────────────────────────────┐  │  │  │  │  │
│  │  │  │ │ │ .progress-fill                 │  │  │  │  │  │
│  │  │  │ │ │ (diagonal stripes)             │  │  │  │  │  │
│  │  │  │ │ └────────────────────────────────┘  │  │  │  │  │
│  │  │  │ └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  │                                                  │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │ .question-container                      │  │  │  │
│  │  │  │ margin-bottom: 30px                       │  │  │  │
│  │  │  │ width: 100%                              │  │  │  │
│  │  │  │ height: 120px (fixed)                    │  │  │  │
│  │  │  │ ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │ │ .question-text                     │  │  │  │  │
│  │  │  │ │ margin: 0 auto (centers)            │  │  │  │  │
│  │  │  │ │ padding: 0 10px (left/right: 10px) │  │  │  │  │
│  │  │  │ │ max-width: 700px                    │  │  │  │  │
│  │  │  │ │ ┌──────────────────────────────┐   │  │  │  │  │
│  │  │  │ │ │ "Question text here"        │   │  │  │  │  │ ← Content
│  │  │  │ │ └──────────────────────────────┘   │  │  │  │  │
│  │  │  │ └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  │                                                  │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │ .likert-scale-horizontal                 │  │  │  │
│  │  │  │ margin-bottom: 50px                      │  │  │  │
│  │  │  │ max-width: 600px                         │  │  │  │
│  │  │  │ ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │ │ .likert-buttons-row                │  │  │  │  │
│  │  │  │ │ gap: 20px (space between buttons)  │  │  │  │  │
│  │  │  │ │ margin-bottom: 12px                 │  │  │  │  │
│  │  │  │ │ ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐          │  │  │  │  │
│  │  │  │ │ │○│ │○│ │○│ │○│ │○│ │              │  │  │  │  │
│  │  │  │ └──┘ └──┘ └──┘ └──┘ └──┘          │  │  │  │  │
│  │  │  │ └────────────────────────────────────┘  │  │  │  │
│  │  │  │ ┌────────────────────────────────────┐  │  │  │  │
│  │  │  │ │ .likert-labels                     │  │  │  │  │
│  │  │  │ │ "DISAGREE" ... "AGREE"             │  │  │  │  │
│  │  │  │ └────────────────────────────────────┘  │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  │                                                  │  │  │
│  │  │  ┌──────────────────────────────────────────┐  │  │  │
│  │  │  │ .quiz-navigation                        │  │  │  │
│  │  │  │ margin: 0 auto (centers)                 │  │  │  │
│  │  │  │ gap: 20px (space between buttons)       │  │  │  │
│  │  │  │ max-width: 600px                        │  │  │  │
│  │  │  │ ┌──────────┐      ┌──────────┐          │  │  │  │
│  │  │  │ │ BACK     │      │ NEXT     │          │  │  │  │
│  │  │  │ │ padding: │      │ padding: │          │  │  │  │
│  │  │  │ │ 12px 32px│      │ 12px 32px│          │  │  │  │
│  │  │  │ │ border:  │      │ border:  │          │  │  │  │
│  │  │  │ │ 2px solid│      │ 2px solid│          │  │  │  │
│  │  │  │ └──────────┘      └──────────┘          │  │  │  │
│  │  │  └──────────────────────────────────────────┘  │  │  │
│  │  │                                                  │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Spacing Summary (Top to Bottom):

1. **.main-content**
   - `padding: 16px` (all sides)

2. **.quiz-content**
   - `padding: 40px 20px` (top/bottom: 40px, left/right: 20px)
   - `margin: 0 auto` (centers horizontally)

3. **.question-number**
   - `margin-bottom: 20px` ← Space below question number

4. **.quiz-progress**
   - `margin-bottom: 40px` ← Space below progress bar

5. **.question-container**
   - `margin-bottom: 30px` ← Space below question
   - `height: 120px` (fixed to prevent jumping)

6. **.question-text**
   - `padding: 0 10px` (left/right: 10px)
   - `margin: 0 auto` (centers horizontally)

7. **.likert-scale-horizontal**
   - `margin-bottom: 50px` ← Space below Likert scale

8. **.likert-buttons-row**
   - `gap: 20px` (space between radio buttons)
   - `margin-bottom: 12px` ← Space below buttons

9. **.quiz-navigation**
   - `gap: 20px` (space between BACK and NEXT buttons)
   - `margin: 0 auto` (centers horizontally)

10. **.nav-button**
    - `padding: 12px 32px` (top/bottom: 12px, left/right: 32px)
    - `border: 2px solid white`

## Total Vertical Spacing:

- Question number to progress: **20px**
- Progress to question: **40px**
- Question to Likert scale: **30px**
- Likert scale to navigation: **50px**

## CSS Box Model Layers (from outside to inside):

1. **MARGIN** - Space outside the element (transparent, pushes away from other elements)
2. **BORDER** - Edge of the element (visible line around padding)
3. **PADDING** - Space inside the element, between border and content
4. **CONTENT** - The actual content (text, images, etc.)

## Key Rules:

- **Margin** = Space between elements (collapses with adjacent margins)
- **Padding** = Space inside element (adds to element's total size)
- **Total Width** = width + padding-left + padding-right + border-left + border-right
- **Total Height** = height + padding-top + padding-bottom + border-top + border-bottom
- **Box-sizing: border-box** = width/height includes padding and border (not margin)

