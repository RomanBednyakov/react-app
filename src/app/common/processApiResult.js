import axios from 'axios';

async function processApiResult(
  apiMethodCall,
  processResult,
  processError,
) {
  try {
    const { data, ...responseMeta } = await apiMethodCall;

    try {
      if (processResult) {
        processResult(data, responseMeta);
      }
    } catch (error) {
      error.message = `Error happened during processing API response: ${error.message}`;
      throw error;
    }

    return { res: data, err: null };
  } catch (error) {
    if (!error.isAxiosError) {
      if (axios.isCancel(error)) {
        return { err: error, res: null };
      }
      throw error;
    }

    if (processError) {
      processError(error);
    }

    return { err: error, res: null };
  }
}

export default processApiResult;
