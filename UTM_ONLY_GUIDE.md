# UTM Tracking Without Webhooks - Simple Guide

This guide shows you how to use UTM tracking with your calendar system **without requiring webhooks from Zcal**.

## 🎯 **How It Works (No Webhooks Required)**

1. **Send tracked link** to prospect via email
2. **Prospect clicks link** → UTM data captured automatically
3. **Booking session created** in your system
4. **Manually create meeting** from dashboard when they actually book

## 🚀 **Step-by-Step Process**

### **Step 1: Generate UTM Link**
1. Go to `/test-utm` page
2. Fill in UTM parameters:
   - `utm_source`: cursuscapital
   - `utm_medium`: email
   - `utm_campaign`: discovery_call
   - `utm_content`: zcal
   - `email`: prospect@company.com
   - `name`: John Doe
3. Copy the generated link

### **Step 2: Send Email**
```html
Subject: Let's Schedule Your Discovery Call

Hi John,

I'd love to schedule a discovery call to discuss your investment needs.

Please click the link below to book a time that works for you:

[YOUR_TRACKED_LINK_HERE]

Looking forward to our conversation!

Best regards,
Your Name
```

### **Step 3: Prospect Clicks Link**
- Lands on `/calendar-booking`
- UTM data captured automatically
- Booking session created
- Redirects to Zcal

### **Step 4: Monitor Dashboard**
1. Go to your dashboard
2. Look for "Pending Booking Sessions" section
3. When prospect actually books, click "Create Meeting"
4. Meeting appears with full UTM tracking

## 📊 **What Gets Tracked**

### **UTM Data:**
- Source (where the link was shared)
- Medium (email, linkedin, etc.)
- Campaign (discovery_call, follow_up, etc.)
- Content (zcal, calendly, etc.)

### **Prospect Data:**
- Email address
- Name
- Referrer (where they came from)
- Timestamp

## 🎨 **Dashboard Features**

### **Booking Sessions Section:**
- Shows all pending booking sessions
- Displays UTM tags and prospect info
- "Create Meeting" button to manually add meetings
- Automatic cleanup when meetings are created

### **Meeting Creation:**
- Preserves all UTM data
- Links to original booking session
- Shows source attribution in dashboard

## 🔧 **Setup Instructions**

### **1. Configure Zcal Redirect**
In your Zcal settings, set the redirect URL after booking to:
```
https://cursuscapital.co/booking-complete
```

### **2. Test the Flow**
1. Go to `/test-utm`
2. Generate a test link
3. Click the test link
4. Check your dashboard for the booking session
5. Create a meeting manually

### **3. Use in Production**
1. Generate links for your campaigns
2. Send to prospects
3. Monitor dashboard for booking sessions
4. Create meetings when they book

## 📈 **Analytics & Reporting**

### **What You Can Track:**
- **Booking sessions** by source
- **Conversion rates** by campaign
- **Prospect quality** by UTM parameters
- **Geographic data** from referrer

### **Dashboard Metrics:**
- Total booking sessions
- Sessions by source (email, linkedin, etc.)
- Sessions by campaign
- Conversion rates to meetings

## 🎯 **Example Workflows**

### **Email Campaign:**
```
Link: https://cursuscapital.co/calendar-booking?utm_source=cursuscapital&utm_medium=email&utm_campaign=discovery_call&utm_content=zcal&email=john@startup.com&name=John%20Smith
```

### **LinkedIn Outreach:**
```
Link: https://cursuscapital.co/calendar-booking?utm_source=cursuscapital&utm_medium=linkedin&utm_campaign=networking&utm_content=zcal&email=sarah@company.com&name=Sarah%20Johnson
```

## 🔄 **Complete Flow Example**

### **1. You send email:**
```
Hi John,

Let's schedule a discovery call to discuss your Series A funding.

Book here: https://cursuscapital.co/calendar-booking?utm_source=cursuscapital&utm_medium=email&utm_campaign=discovery_call&utm_content=zcal&email=john@startup.com&name=John%20Smith

Best regards,
Hampus
```