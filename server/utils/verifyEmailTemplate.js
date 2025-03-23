const verifyEmailTemplate = ({ name, url }) => {
    return `
        <p>Dear ${name},</p>    
        <p>Thank you for registering with E-commerce.</p>   
        <a href="${url}" style="color: white; background: orange; margin-top: 10px; padding: 10px 20px; display: inline-block; text-decoration: none; border-radius: 5px;">
            Verify Email
        </a>
        <p>If you did not request this, please ignore this email.</p>
    `;
};


export default verifyEmailTemplate