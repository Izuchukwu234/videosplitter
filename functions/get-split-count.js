export async function onRequest(context) {
  try {
    // Execute the D1 query
    const stmt = await context.env.freevideosplitterorg.prepare(
      'SELECT * FROM counter WHERE id = 1'
    );
    const result = await stmt.first();

    // Return the count with CORS headers
    return new Response(JSON.stringify({ count: result.count }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch count' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
