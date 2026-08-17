export const getOrderStatusEmailTemplate = (order) => {
    const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').pop().trim() : 'http://localhost:5174';
    const orderId = order.orderId || order._id;
    const trackingInfo = order.status === 'Shipped' && order.trackingNumber 
        ? `
        <div style="margin-top: 25px; padding: 20px; background-color: rgba(212, 175, 55, 0.05); border-left: 4px solid #d4af37; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">Tracking Information</p>
            <p style="margin: 0 0 5px 0; color: #f8f9fa;"><strong>Courier:</strong> ${order.courierName || 'Standard Shipping'}</p>
            <p style="margin: 0; color: #f8f9fa;"><strong>Tracking Number:</strong> <span style="color: #d4af37;">${order.trackingNumber}</span></p>
        </div>
        ` 
        : '';

    const itemsHtml = order.orderItems.map(item => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 15px 0; color: #f8f9fa;">
                <p style="margin: 0; font-weight: 600;">${item.name}</p>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #a1a1aa;">Qty: ${item.quantity} | Size: ${item.size}</p>
            </td>
            <td style="padding: 15px 0; text-align: right; color: #f8f9fa;">
                ₹${(item.price * item.quantity).toLocaleString('en-IN')}
            </td>
        </tr>
    `).join('');

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .container { max-width: 600px; margin: 0 auto; background-color: #080b14; }
            .header { padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .logo { font-size: 24px; font-weight: 700; color: #f8f9fa; text-decoration: none; font-family: Georgia, serif; }
            .logo span { color: #d4af37; }
            .content { padding: 40px 30px; color: #e4e4e7; line-height: 1.6; }
            .status-badge { display: inline-block; padding: 8px 16px; background-color: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); color: #d4af37; border-radius: 50px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase; margin: 20px 0; }
            .order-details { width: 100%; border-collapse: collapse; margin-top: 30px; }
            .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); color: #71717a; font-size: 13px; }
            .btn { display: inline-block; padding: 14px 28px; background-color: #d4af37; color: #080b14 !important; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 30px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <a href="#" class="logo">Makhana <span>House</span></a>
            </div>
            <div class="content">
                <h1 style="color: #f8f9fa; font-size: 24px; margin: 0 0 10px 0; font-family: Georgia, serif;">Order Update</h1>
                <p style="font-size: 16px; margin: 0;">Hello ${order.user.name},</p>
                
                <p style="margin: 20px 0 0 0;">Your order <strong>#${orderId}</strong> status has been updated to:</p>
                <div class="status-badge">${order.status}</div>

                ${trackingInfo}

                <h3 style="color: #f8f9fa; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 10px; margin-top: 40px; font-family: Georgia, serif;">Order Summary</h3>
                <table class="order-details">
                    ${itemsHtml}
                    <tr>
                        <td style="padding: 15px 0; color: #a1a1aa; font-size: 14px;">Subtotal</td>
                        <td style="padding: 15px 0; text-align: right; color: #f8f9fa;">₹${order.itemsPrice.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #a1a1aa; font-size: 14px;">Shipping</td>
                        <td style="padding: 10px 0; text-align: right; color: #f8f9fa;">₹${order.shippingPrice.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; color: #a1a1aa; font-size: 14px;">Tax</td>
                        <td style="padding: 10px 0; text-align: right; color: #f8f9fa;">₹${order.taxPrice.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                        <td style="padding: 20px 0 0 0; color: #f8f9fa; font-weight: 700; font-size: 18px; border-top: 1px solid rgba(255,255,255,0.05);">Total</td>
                        <td style="padding: 20px 0 0 0; text-align: right; color: #d4af37; font-weight: 700; font-size: 18px; border-top: 1px solid rgba(255,255,255,0.05);">₹${order.totalPrice.toLocaleString('en-IN')}</td>
                    </tr>
                </table>

                <center>
                    <a href="${clientUrl}/profile/orders/${order._id}" class="btn">View Order Details</a>
                </center>
            </div>
            <div class="footer">
                <p style="margin: 0 0 10px 0;">This email was sent to ${order.user.email}</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Makhana House. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

export const getExportInquiryStatusEmailTemplate = (inquiry, customMessage) => {
    const clientUrl = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').pop().trim() : 'http://localhost:5174';
    const inquiryId = inquiry._id.toString().substring(18);
    
    const customMessageHtml = customMessage ? `
        <div style="margin-top: 25px; padding: 20px; background-color: rgba(212, 175, 55, 0.05); border-left: 4px solid #d4af37; border-radius: 4px;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 1px;">Message from our team</p>
            <p style="margin: 0; color: #f8f9fa; font-style: italic;">"${customMessage}"</p>
        </div>
    ` : '';

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050505; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .container { max-width: 600px; margin: 0 auto; background-color: #080b14; }
            .header { padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .logo { font-size: 24px; font-weight: 700; color: #f8f9fa; text-decoration: none; font-family: Georgia, serif; }
            .logo span { color: #d4af37; }
            .content { padding: 40px 30px; color: #e4e4e7; line-height: 1.6; }
            .status-badge { display: inline-block; padding: 8px 16px; background-color: rgba(212, 175, 55, 0.1); border: 1px solid rgba(212, 175, 55, 0.3); color: #d4af37; border-radius: 50px; font-weight: 600; font-size: 14px; letter-spacing: 0.5px; text-transform: uppercase; margin: 20px 0; }
            .footer { padding: 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); color: #71717a; font-size: 13px; }
            .btn { display: inline-block; padding: 14px 28px; background-color: #d4af37; color: #080b14 !important; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 30px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <a href="#" class="logo">Makhana <span>House</span></a>
            </div>
            <div class="content">
                <h1 style="color: #f8f9fa; font-size: 24px; margin: 0 0 10px 0; font-family: Georgia, serif;">Inquiry Update</h1>
                <p style="font-size: 16px; margin: 0;">Hello ${inquiry.fullName},</p>
                
                <p style="margin: 20px 0 0 0;">The status of your export inquiry (ID: <strong>#${inquiryId}</strong>) regarding <strong>${inquiry.productInterest}</strong> has been updated to:</p>
                <div class="status-badge">${inquiry.status}</div>

                ${customMessageHtml}

                <center>
                    <a href="${clientUrl}/profile/inquiries" class="btn">View Inquiry Dashboard</a>
                </center>
            </div>
            <div class="footer">
                <p style="margin: 0 0 10px 0;">This email was sent to ${inquiry.email}</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Makhana House. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
