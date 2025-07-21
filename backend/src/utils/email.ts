export const sendEmail = async (to: string, subject: string, html: string) => {
  // Mock email sending for development
  console.log('📧 Mock Email Sent to:', to);
  console.log('Subject:', subject);
  console.log('Content:', html);
  return true;
};
