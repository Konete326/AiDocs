import LeftPanel from '../components/layout/LeftPanel';
import RightPanel from '../components/layout/RightPanel';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4';

const Home = () => (
  <div className="relative min-h-screen flex flex-row overflow-hidden bg-black">
    <video
      src={VIDEO_URL}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
    <div className="absolute inset-0 bg-black/30 z-[1]" />
    <div className="relative z-10 flex flex-row w-full min-h-screen">
      <LeftPanel />
      <RightPanel />
    </div>
  </div>
);

export default Home;
