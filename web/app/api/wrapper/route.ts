
import { Hono } from 'hono';
import { XMLParser } from 'fast-xml-parser'; // Assuming XML parser is available

// Define the ApiResponse type as per IDENTITY.md
type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  meta?: {
    page?: number;
    total?: number;
    cursor?: string;
  };
};

// Define the Holiday type based on the API response
interface Holiday {
  Name: string;
  Date: string;
  Description: string;
  Type: 'National' | 'Municipal' | 'Optional' | 'Religious' | 'Regional';
  Municipality?: {
    Id: string;
    Name: string;
  };
}

// Placeholder for Concierge Buffer integration (Pilar 6)
async function updateConciergeBuffer(holidays: Holiday[]): Promise<void> {
  console.log('Concierge Buffer: Updating with holidays data', holidays.length);
  // In a real scenario, this would send data to the Concierge Buffer service.
  // For now, it just logs the action.
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
}

// Placeholder for Vibe Meter integration (Pilar 11 from Nero)
async function updateVibeMeter(holidays: Holiday[]): Promise<void> {
  console.log('Vibe Meter: Analyzing holidays for vibe impact', holidays.length);
  // In a real scenario, this would send data to the Vibe Meter service (Nero).
  // For now, it just logs the action.
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
}

const app = new Hono();

app.get('/api/wrapper', async (c) => {
  const year = new Date().getFullYear(); // Get current year dynamically
  const apiUrl = `http://services.sapo.pt/Holiday/GetAllHolidays?year=${year}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return c.json<ApiResponse<null>>({
        data: null,
        error: `Failed to fetch holidays: ${response.statusText}`,
      }, response.status);
    }

    const xmlText = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      parseTagValue: true,
      parseAttributeValue: false,
      trimValues: true,
      arrayNodeName: 'Holiday', // Treat Holiday as an array
      tagValueProcessor: (tagName, tagValue) => {
        // Attempt to parse date strings into Date objects, if needed later
        if (tagName === 'Date' && typeof tagValue === 'string') {
          return new Date(tagValue);
        }
        return tagValue;
      },
    });
    const result = parser.parse(xmlText);

    // Navigate to the array of holidays. The structure is <GetAllHolidaysResponse><GetAllHolidaysResult><Holiday>...</Holiday></GetAllHolidaysResult></GetAllHolidaysResponse>
    const holidaysData: Holiday[] = result.GetAllHolidaysResponse?.GetAllHolidaysResult?.Holiday || [];

    // Ensure holidaysData is always an array, even if there's only one holiday
    const normalizedHolidays = Array.isArray(holidaysData) ? holidaysData : [holidaysData];

    // Integrate with Concierge Buffer and Vibe Meter
    await updateConciergeBuffer(normalizedHolidays);
    await updateVibeMeter(normalizedHolidays);

    return c.json<ApiResponse<Holiday[]>>({
      data: normalizedHolidays,
      error: null,
      meta: {
        total: normalizedHolidays.length,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/wrapper:', error);
    return c.json<ApiResponse<null>>({
      data: null,
      error: `Internal Server Error: ${error.message || 'Unknown error'}`,
    }, 500);
  }
});

export default app;
