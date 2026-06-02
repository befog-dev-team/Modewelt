import { StreamChat } from 'stream-chat';

// Lazily initialize so missing env vars don't crash the module at import time
let _streamServerClient: StreamChat | null = null;

function getStreamServerClient(): StreamChat | null {
  if (!process.env.NEXT_PUBLIC_STREAM_KEY || !process.env.STREAM_SECRET) {
    console.warn('⚠️ Stream Chat env vars not set — Stream features disabled.');
    return null;
  }
  if (!_streamServerClient) {
    _streamServerClient = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_KEY,
      process.env.STREAM_SECRET,
    );
  }
  return _streamServerClient;
}

// This is a singleton instance of the StreamChat client (may be null if unconfigured)
const streamServerClient = getStreamServerClient();
export default streamServerClient;