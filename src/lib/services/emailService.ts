import nodemailer from 'nodemailer';

// Create Nodemailer Transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER || 'maazarshad89@gmail.com',
    pass: process.env.SMTP_PASS || 'bjibcbctwetunpmx',
  },
});

const FROM_EMAIL = process.env.EMAIL_FROM || '"ELEGANTSTYLE MAISON" <maazarshad89@gmail.com>';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'maazarshad89@gmail.com';

/**
 * Send Customer Order Confirmation Email
 */
export async function sendOrderConfirmationEmail(order: any) {
  try {
    const itemsListHtml = (order.items || [])
      .map(
        (it: any) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ECE7E6;">${it.productName || it.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ECE7E6; text-align: center;">${it.quantity}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ECE7E6; text-align: right; font-family: monospace;">PKR ${(it.pricePKR || it.price * 280).toLocaleString()}</td>
        </tr>`
      )
      .join('');

    const html = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FCFAF9; border: 1px solid #ECE7E6; color: #171515;">
        <div style="background: #171515; color: #FCFAF9; padding: 25px; text-align: center;">
          <h1 style="font-family: Georgia, serif; letter-spacing: 3px; margin: 0; font-size: 22px; text-transform: uppercase;">ELEGANTSTYLE</h1>
          <p style="font-size: 10px; letter-spacing: 2px; color: #E9C9CE; margin-top: 5px; text-transform: uppercase;">LUXURY BEAUTY & FASHION MAISON</p>
        </div>

        <div style="padding: 30px;">
          <h2 style="font-family: Georgia, serif; font-weight: 300; font-size: 20px; color: #171515; margin-top: 0;">Order Confirmation #${order.id}</h2>
          <p style="font-size: 13px; color: #6E6767; leading-height: 1.6;">Dear <strong>${order.customerName}</strong>,</p>
          <p style="font-size: 13px; color: #6E6767;">Thank you for your order with ELEGANTSTYLE. Your purchase has been logged in our Maison ledger and is being prepared for dispatch.</p>

          <div style="background: #FFFFFF; border: 1px solid #ECE7E6; padding: 15px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
              <thead>
                <tr style="background: #FCFAF9; border-bottom: 1px solid #ECE7E6; text-transform: uppercase; font-size: 10px; color: #7A7375;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsListHtml}
              </tbody>
            </table>

            <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #171515; text-align: right; font-size: 14px;">
              <strong>Total Amount: <span style="color: #A21D21;">PKR ${(order.totalPKR || order.totalAmount).toLocaleString()}</span></strong>
            </div>
          </div>

          <div style="background: #FFFFFF; border: 1px solid #ECE7E6; padding: 15px; font-size: 12px; margin-bottom: 20px;">
            <h4 style="margin: 0 0 10px 0; text-transform: uppercase; font-size: 10px; color: #C58C97; letter-spacing: 1px;">Delivery Destination</h4>
            <p style="margin: 2px 0;"><strong>City:</strong> ${order.shippingAddress?.city || 'Pakistan'}</p>
            <p style="margin: 2px 0;"><strong>Address:</strong> ${typeof order.shippingAddress === 'string' ? order.shippingAddress : order.shippingAddress?.street}</p>
            <p style="margin: 2px 0;"><strong>Payment Method:</strong> ${order.paymentMethod || 'Cash on Delivery (COD)'}</p>
          </div>

          <p style="font-size: 12px; color: #7A7375; text-align: center; margin-top: 30px;">If you have any questions regarding your parcel, reply directly to this email.</p>
        </div>

        <div style="background: #171515; color: #7A7375; padding: 15px; text-align: center; font-size: 10px;">
          © 2026 ELEGANTSTYLE MAISON. ALL RIGHTS RESERVED.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: order.customerEmail,
      subject: `Order Confirmation #${order.id} — ELEGANTSTYLE Maison`,
      html,
    });

    console.log(`[Nodemailer] Order confirmation email sent to ${order.customerEmail}`);
  } catch (error) {
    console.error('[Nodemailer] Error sending order confirmation email:', error);
  }
}

/**
 * Send New Order Alert Notification to Admin (maazarshad89@gmail.com)
 */
export async function sendAdminNewOrderAlert(order: any) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #3A3134; background: #141213; color: #F3ECEB; padding: 20px;">
        <div style="border-bottom: 1px solid #242022; pb: 15px; margin-bottom: 15px;">
          <span style="background: #E9C9CE; color: #171515; padding: 3px 8px; font-size: 10px; font-weight: bold; font-family: monospace;">NEW ORDER ALERT</span>
          <h2 style="color: #FFFFFF; font-family: Georgia, serif; margin: 10px 0 0 0;">New Purchase #${order.id}</h2>
        </div>

        <table style="width: 100%; font-size: 13px; color: #B0A7A9; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #7A7375;">Customer Name:</td><td style="color: #FFFFFF; font-weight: bold;">${order.customerName}</td></tr>
          <tr><td style="padding: 6px 0; color: #7A7375;">Customer Phone:</td><td style="color: #E9C9CE; font-family: monospace;">${order.customerPhone || 'N/A'}</td></tr>
          <tr><td style="padding: 6px 0; color: #7A7375;">Customer Email:</td><td>${order.customerEmail}</td></tr>
          <tr><td style="padding: 6px 0; color: #7A7375;">City & Address:</td><td>${order.shippingAddress?.city || ''}, ${typeof order.shippingAddress === 'string' ? order.shippingAddress : order.shippingAddress?.street}</td></tr>
          <tr><td style="padding: 6px 0; color: #7A7375;">Payment Channel:</td><td>${order.paymentMethod || 'Cash on Delivery'}</td></tr>
          <tr><td style="padding: 6px 0; color: #7A7375;">Total Amount:</td><td style="color: #FFFFFF; font-size: 16px; font-weight: bold;">PKR ${(order.totalPKR || order.totalAmount).toLocaleString()}</td></tr>
        </table>

        <div style="margin-top: 20px; pt: 15px; border-top: 1px solid #242022; text-align: center;">
          <a href="http://localhost:3000/admin/orders" style="background: #E9C9CE; color: #171515; padding: 10px 20px; text-decoration: none; font-size: 12px; font-weight: bold; display: inline-block;">Manage Order in Admin Portal</a>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `🚨 New Order #${order.id} Received — PKR ${(order.totalPKR || order.totalAmount).toLocaleString()}`,
      html,
    });

    console.log(`[Nodemailer] Admin new order alert sent to ${ADMIN_EMAIL}`);
  } catch (error) {
    console.error('[Nodemailer] Error sending admin order alert:', error);
  }
}

/**
 * Send Order Fulfillment Status Update Email to Customer
 */
export async function sendOrderStatusUpdateEmail(order: any, newStatus: string) {
  try {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #FCFAF9; border: 1px solid #ECE7E6; padding: 25px;">
        <h2 style="font-family: Georgia, serif; color: #171515;">Order #${order.id} Status Updated</h2>
        <p style="font-size: 13px; color: #6E6767;">Dear ${order.customerName},</p>
        <p style="font-size: 13px; color: #6E6767;">Your order fulfillment status has been updated to:</p>
        
        <div style="background: #171515; color: #E9C9CE; padding: 15px; text-align: center; font-size: 16px; font-family: monospace; letter-spacing: 2px; text-transform: uppercase; margin: 20px 0;">
          Status: ${newStatus}
        </div>

        <p style="font-size: 12px; color: #7A7375;">You can track your order status anytime on our website at <a href="http://localhost:3000/track-order" style="color: #C58C97;">Track Order</a>.</p>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: order.customerEmail,
      subject: `Order #${order.id} Status Update: ${newStatus} — ELEGANTSTYLE`,
      html,
    });

    console.log(`[Nodemailer] Order status update email sent to ${order.customerEmail}`);
  } catch (error) {
    console.error('[Nodemailer] Error sending status update email:', error);
  }
}

/**
 * Send Password Reset OTP Email (for User or Admin)
 */
export async function sendPasswordResetEmail(email: string, otpCode: string, role: 'user' | 'admin' = 'user') {
  try {
    const title = role === 'admin' ? 'Maison Admin Passkey Reset' : 'VIP Client Password Reset';

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #141213; border: 1px solid #242022; color: #F3ECEB; padding: 30px; text-align: center;">
        <h2 style="font-family: Georgia, serif; color: #FFFFFF; letter-spacing: 2px; uppercase">${title}</h2>
        <p style="font-size: 12px; color: #B0A7A9; margin-bottom: 25px;">We received a request to reset the passkey for <strong>${email}</strong>.</p>
        
        <div style="background: #262123; border: 1px border #3A3134; color: #E9C9CE; padding: 20px; font-size: 28px; font-family: monospace; letter-spacing: 8px; font-weight: bold; margin: 20px 0;">
          ${otpCode}
        </div>

        <p style="font-size: 11px; color: #7A7375; margin-top: 20px;">Use this 6-digit verification code to complete your passkey reset. This code is valid for 15 minutes.</p>
        <p style="font-size: 10px; color: #6B6466; margin-top: 25px;">If you did not initiate this request, please ignore this message.</p>
      </div>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: email,
      subject: `🔑 ${otpCode} — Your ${title} Code`,
      html,
    });

    console.log(`[Nodemailer] Password reset email sent to ${email} (OTP: ${otpCode})`);
  } catch (error) {
    console.error('[Nodemailer] Error sending password reset email:', error);
  }
}
