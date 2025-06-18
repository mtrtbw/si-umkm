import { useEffect, useState } from 'react';

export default function DaftarPelatihan() {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setCsrfToken(data.csrfToken));
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/registrations', {
      method: 'POST',
      headers: {
  'Content-Type': 'application/json',
  'csrf-token': csrfToken,
}
,
      body: JSON.stringify({
        name: 'Tartib',
        program: 'Pelatihan Digital Marketing',
      }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div>
      <h1>Pendaftaran Pelatihan UMKM</h1>
      <button onClick={handleSubmit}>Daftar Sekarang</button>
    </div>
  );
}
