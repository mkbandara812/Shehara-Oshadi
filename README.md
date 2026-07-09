# Premium Wedding Invitation Template

A premium Next.js wedding invitation template with:
- Elegant hero section
- Countdown timer
- Event details
- Inquiry and WhatsApp buttons
- RSVP form connected to Google Sheets
- Optional background music button

## 1. Install

```bash
npm install
```

## 2. Add environment file

Copy `.env.example` to `.env.local` and paste your deployed Google Apps Script URL.

```bash
cp .env.example .env.local
```

## 3. Run

```bash
npm run dev
```

## 4. Google Sheets setup

Create a Google Sheet with these columns in `Sheet1`:

```text
Name | Phone | Attending | Guests | Message | Timestamp
```

Then:
1. Open Extensions -> Apps Script
2. Paste the code from `google-apps-script.js`
3. Save
4. Deploy -> New deployment
5. Type: Web app
6. Execute as: Me
7. Who has access: Anyone
8. Copy the deployed URL
9. Paste it into `.env.local`

## 5. Music

Put your background song in `/public/music.mp3`

## 6. Customize

Edit the text inside `app/page.tsx`

## 7. Deploy

Deploy easily on Vercel.
