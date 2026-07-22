//
import './App.css';
import FeatureCard from './component/FeatureCard';
import ShortnerForm from './component/ShortnerForm';
import { Link, QrCode, BarChart3, ShieldCheck, Zap, ThumbsUp } from 'lucide-react';

const Features = [
  {
    icon: ThumbsUp,
    title: 'Easy to Use',
    description: 'Paste your long URL and get a short link in seconds.',
  },
  {
    icon: Zap,
    title: 'Fast Redirects',
    description: 'Optimized redirects ensure users reach their destination instantly.',
  },
  {
    icon: Link,
    title: 'Custom Short Links',
    description: 'Create memorable custom aliases instead of random characters.',
  },
  {
    icon: QrCode,
    title: 'QR Codes',
    description: 'Generate a QR code for every short link to share anywhere.',
  },
  {
    icon: BarChart3,
    title: 'Analytics',
    description: 'Track clicks, visitors, devices, and locations with detailed insights.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure',
    description: 'Unique short codes with validation and secure redirects.',
  },
];
function App() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <ShortnerForm />
        {/* Create Account */}
        <div className="flex flex-col items-center max-w-6xl rounded shadow shadow-gray-500/30 px-4 md:px-16 py-6 gap-4">
          <h3 className="text-3xl font-bold text-neutral-700">Want More? Try Premium Features!</h3>
          <p className="max-w-3xl text-md text-gray-600">
            Custom short links, powerful dashboard, detailed analytics, API, UTM builder, QR codes,
            browser extension, app integrations and support. Start Free
          </p>
          <button className="block mt-4 bg-blue-500 text-white w-auto h-12 mx-auto px-16 font-semibold  cursor-pointer ">
            Create Account
          </button>
        </div>
        {/* Features Card */}
        <div className="grid  grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 mt-4  max-w-5xl">
          {Features.map((feature) => (
            <FeatureCard key={feature.title} Icon={feature.icon} {...feature} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
