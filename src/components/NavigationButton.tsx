'use client';

import { useRouter } from 'next/navigation';

function NavigationButton({
  destination,
  label,
}: {
  destination: '/dashboard' | '/home';
  label: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(destination);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
      style={{ margin: '10px' }}
    >
      {label}
    </button>
  );
}

export default NavigationButton;