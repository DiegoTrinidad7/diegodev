import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, message } = body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "tmxzdiego@gmail.com",
      subject: `Nuevo mensaje de ${name}`,
      html: `
        <div style="font-family:sans-serif;">
          <h2>Nuevo mensaje desde Diego.dev</h2>

          <p><strong>Nombre:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Mensaje:</strong></p>

          <div style="padding:12px;background:#111;color:white;border-radius:12px;">
            ${message}
          </div>
        </div>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({
      error,
    });
  }
}