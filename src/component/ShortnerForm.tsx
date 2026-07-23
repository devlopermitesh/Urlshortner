import { Form, useActionData, useNavigation } from 'react-router';
import { api } from '../utils/api';
import QRCode from 'react-qr-code';

interface ResponseState {
  success: boolean;
  message: string;
  error?: string;
  data?: {
    data?: {
      shortUrl?: string;
    };
  };
}

export async function SubmitAction({ request }: { request: Request }): Promise<ResponseState> {
  try {
    const formData = await request.formData();
    const url = formData.get('url')?.toString() ?? '';

    if (!URL.canParse(url)) {
      return {
        success: false,
        message: 'Invalid URL',
        error: 'Please enter a valid URL.',
      };
    }

    const response = await api.post('new_url', { url });
    return {
      success: true,
      message: 'Short URL created successfully.',
      data: response.data as ResponseState['data'],
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create short URL.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export default function ShortnerForm() {
  const currentOrigin = window.location.origin;
  const actionData = useActionData() as ResponseState | undefined;
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="flex flex-col max-w-6xl rounded shadow-md shadow-gray-500 px-4 md:px-16 py-6 gap-4">
      <h3 className="text-3xl font-bold text-neutral-700">Paste the URL to be shortened</h3>

      <Form method="post">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            id="url"
            name="url"
            type="text"
            placeholder="Enter URL here"
            className="flex-1 px-4 py-4 rounded shadow-inner shadow-neutral-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-6 py-4 rounded disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Short URL'}
          </button>
        </div>

        <div className="mt-4">
          {actionData?.error && <p className="text-red-600">{actionData.error}</p>}

          {actionData?.success && <p className="text-green-600">{actionData.message}</p>}

          {actionData?.data?.data?.shortUrl && (
            <a
              href={`${currentOrigin}/u/${actionData.data.data.shortUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mt-2 mx-auto"
            >
              {`${currentOrigin}/u/${actionData.data.data.shortUrl}`}
            </a>
          )}

          {/* */}

          {actionData?.data?.data?.shortUrl && (
            <div className="flex flex-col w-full justify-center items-center">
              <QRCode
                value={`${currentOrigin}/u/${actionData.data.data.shortUrl}`}
                size={200}
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            </div>
          )}
          <p className="mt-4 text-neutral-600 max-w-3xl">
            ShortURL is a free tool to shorten URLs and generate short links. URL shortener allows
            you to create shortened links that are easier to share.
          </p>
        </div>
      </Form>
    </div>
  );
}
