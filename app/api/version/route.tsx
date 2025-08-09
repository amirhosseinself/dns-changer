export async function GET() {
  // Return app version in JSON format
  return new Response(
    JSON.stringify({ version: "1.0.0+2" }), // app version
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
