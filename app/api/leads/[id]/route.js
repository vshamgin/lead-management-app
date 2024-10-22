let leads = []; // Ensure this is the same in-memory leads array used in the POST and GET methods

export async function PUT(req, { params }) {
  const { id } = params; // Extract ID from URL

  console.log("Attempting to update lead with ID:", id);

  try {
    const leadIndex = leads.findIndex((lead) => lead.id === id);

    if (leadIndex !== -1) {
      leads[leadIndex].state = "REACHED_OUT"; // Update lead state
      console.log("Lead updated:", leads[leadIndex]);
      return new Response(JSON.stringify(leads[leadIndex]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      console.log("Lead not found for ID:", id);
      return new Response(JSON.stringify({ message: "Lead not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    console.error("Error updating lead:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
