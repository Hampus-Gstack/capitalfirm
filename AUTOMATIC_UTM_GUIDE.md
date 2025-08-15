# Automatic UTM Tracking Guide

This guide shows you how to achieve **fully automatic meeting tracking** using UTM parameters, where meetings appear in your dashboard automatically after booking.

## 🎯 **Your Exact Workflow**

1. **Send one link** to prospect via email
2. **Prospect books meeting** via that link
3. **Meeting appears automatically** in your Cursus Capital dashboard with all details

## 🚀 **How It Works**

### **Step 1: Landing Page with UTM Tracking**
```
https://your-domain.com/calendar-booking?utm_source=cursuscapital&utm_medium=email&utm_campaign=discovery_call&utm_content=zcal&email=prospect@company.com&name=John%20Doe
```

### **Step 2: Automatic Session Creation**
- Landing page captures UTM parameters
- Creates a "booking session" in your system
- Stores prospect information
- Redirects to Zcal

### **Step 3: Automatic Meeting Creation**
- When booking completes, Zcal redirects to completion page
- Completion page automatically creates meeting in dashboard
- Meeting appears with full UTM tracking data

## 📋 **Implementation Details**

### **1. Landing Page (`/calendar-booking`)**

**Features:**
- Captures UTM parameters from URL
- Stores prospect information (email, name)
- Creates booking session in your system
- Redirects to Zcal after 2 seconds

**URL Parameters:**
- `utm_source` - Your company name
- `utm_medium` - Where you shared the link (email, linkedin, etc.)
- `utm_campaign` - Campaign name
- `utm_content` - Calendar platform
- `email` - Prospect's email (optional)
- `name` - Prospect's name (optional)

### **2. Booking Sessions API (`/api/booking-sessions`)**

**Purpose:** Manages the booking process from start to finish

**Endpoints:**
- `POST` - Creates a new booking session
- `PUT` - Completes a booking session and creates meeting
- `GET` - Retrieves booking sessions

### **3. Completion Page (`/booking-complete`)**

**Features:**
- Receives booking data from Zcal
- Automatically completes booking session
- Creates meeting in dashboard
- Shows confirmation to user

## 🎨 **Your Email Template**

```html
Subject: Let's Schedule Your Discovery Call

Hi [Prospect Name],

I'd love to schedule a discovery call to discuss [specific topic].

Please click the link below to book a time that works for you:

[TRACKED LINK]

Looking forward to our conversation!

Best regards,
[Your Name]
```

**Your tracked link:**
```
https://your-domain.com/calendar-booking?utm_source=cursuscapital&utm_medium=email&utm_campaign=discovery_call&utm_content=zcal&email=prospect@company.com&name=John%20Doe
```

## 🔧 **Setup Instructions**

### **Step 1: Configure Zcal Redirect**

In your Zcal settings, set the redirect URL after booking to:
```
https://your-domain.com/booking-complete
```

### **Step 2: Create Your Email Links**

Use this format for your email links:
```
https://your-domain.com/calendar-booking?utm_source=cursuscapital&utm_medium=email&utm_campaign=discovery_call&utm_content=zcal&email={PROSPECT_EMAIL}&name={PROSPECT_NAME}
```

### **Step 3: Test the Flow**

1. Send yourself a test email with the tracked link
2. Click the link and book a meeting
3. Check your dashboard - meeting should appear automatically

## 📊 **What Gets Tracked Automatically**

### **UTM Data:**
- Source (where the link was shared)
- Medium (email, linkedin, etc.)
- Campaign (discovery_call, follow_up, etc.)
- Content (zcal, calendly, etc.)

### **Meeting Data:**
- Title (Discovery Call)
- Date and time
- Attendee name and email
- Source platform (Zcal)
- All UTM parameters

### **Analytics:**
- Which email campaigns drive the most meetings
- Which prospects convert best
- Meeting completion rates
- Source attribution

## 🎯 **Example Workflows**

### **Email Campaign:**
```
Link: https://your-domain.com/calendar-booking?utm_source=cursuscapital&utm_medium=email&utm_campaign=january_promo&utm_content=zcal&email=john@startup.com&name=John%20Smith
```

### **LinkedIn Outreach:**
```
Link: https://your-domain.com/calendar-booking?utm_source=cursuscapital&utm_medium=linkedin&utm_campaign=networking&utm_content=zcal&email=sarah@company.com&name=Sarah%20Johnson
```

### **Blog Post:**
```
Link: https://your-domain.com/calendar-booking?utm_source=cursuscapital&utm_medium=blog&utm_campaign=content_marketing&utm_content=zcal&email=reader@domain.com&name=Blog%20Reader
```

## 🔄 **Complete Flow Example**

### **1. You send email:**
```
Hi John,

Let's schedule a discovery call to discuss your Series A funding.

Book here: https://your-domain.com/calendar-booking?utm_source=cursuscapital&utm_medium=email&utm_campaign=discovery_call&utm_content=zcal&email=john@startup.com&name=John%20Smith

Best regards,
Hampus
```

### **2. John clicks link:**
- Lands on `/calendar-booking`
- UTM data captured automatically
- Booking session created
- Redirects to Zcal

### **3. John books meeting:**
- Fills out Zcal form
- Books for "Jan 20, 2024 at 2:00 PM"
- Zcal redirects to completion page

### **4. Meeting appears automatically:**
- Completion page processes booking
- Meeting created in dashboard
- Shows: "Discovery Call - John Smith (john@startup.com)"
- UTM tags: Email, Discovery Call, Zcal

## 🎨 **Dashboard Display**

Your dashboard will show:
```
⚡ Discovery Call - John Smith (john@startup.com)
   Jan 20, 2024 at 2:00 PM • Scheduled
   🔵 cursuscapital 🟢 email 🟣 discovery_call 🟠 zcal
```

## 🚀 **Advanced Features**

### **Custom UTM Parameters:**
You can add custom parameters for better tracking:
```
&utm_source=cursuscapital
&utm_medium=email
&utm_campaign=discovery_call
&utm_content=zcal
&utm_term=series_a
&prospect_type=startup
&deal_size=large
```

### **Multiple Campaigns:**
Create different UTM parameters for different campaigns:
- `utm_campaign=discovery_call`
- `utm_campaign=follow_up`
- `utm_campaign=referral`
- `utm_campaign=networking`

### **Source Attribution:**
Track which sources drive the best meetings:
- Email campaigns
- LinkedIn outreach
- Blog posts
- Referrals
- Networking events

## 📈 **Analytics & Reporting**

### **What You Can Track:**
- **Conversion rates** by source
- **Meeting completion rates** by campaign
- **Prospect quality** by UTM parameters
- **Geographic data** from referrer
- **Time-based patterns** for optimal sending

### **Dashboard Metrics:**
- Total meetings booked
- Meetings by source (email, linkedin, etc.)
- Meetings by campaign
- Conversion rates
- Average meeting value

## 🔧 **Customization Options**

### **Email Templates:**
Create different templates for different audiences:
- Startup founders
- Enterprise clients
- Referral partners
- Networking contacts

### **UTM Parameters:**
Customize based on your needs:
- `utm_source` - Your company name
- `utm_medium` - Marketing channel
- `utm_campaign` - Specific campaign
- `utm_content` - Calendar platform
- `utm_term` - Keywords or topics

### **Landing Page:**
- Custom branding
- Different messages for different campaigns
- A/B testing capabilities
- Analytics integration

## 🆘 **Troubleshooting**

### **Meeting not appearing:**
1. Check Zcal redirect URL is set correctly
2. Verify completion page is working
3. Check browser console for errors
4. Ensure booking session was created

### **UTM data missing:**
1. Verify UTM parameters in URL
2. Check landing page is capturing data
3. Ensure session storage is working
4. Test with simple UTM parameters

### **Redirect not working:**
1. Check Zcal settings
2. Verify completion page URL
3. Test redirect manually
4. Check for JavaScript errors

## 🎯 **Next Steps**

### **Immediate Actions:**
1. **Test the flow** with a sample booking
2. **Configure Zcal redirect** to completion page
3. **Create email templates** with tracked links
4. **Send test emails** to verify automation

### **Optimization:**
1. **A/B test** different UTM parameters
2. **Track conversion rates** by source
3. **Optimize email timing** based on data
4. **Create campaign-specific** landing pages

---

**This solution gives you fully automatic meeting tracking using only UTM parameters - no webhooks required!** 