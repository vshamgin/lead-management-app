let leads = []; // Mock in-memory storage for leads

export async function GET(req) {
  return new Response(JSON.stringify(leads), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      linkedin,
      visasInterested,
      resume,
      country,
      openText, // Add all fields you are using
      state = 'PENDING',
    } = body;

    // Create a new lead object
    const newLead = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      linkedin,
      visasInterested,
      resume,
      country,
      openText, // Include missing fields here
      state,
      submitted: new Date().toLocaleString(),
    };

    // Add the new lead to the in-memory list
    leads.push(newLead);

    return new Response(JSON.stringify(newLead), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to process lead." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
