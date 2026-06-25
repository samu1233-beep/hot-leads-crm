"use client";
import { useActionState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { importWorkbookAction } from './actions';

const initialState = { ok: false, message: '' };

export function ImportForm() {
  const [state, formAction, pending] = useActionState(importWorkbookAction, initialState);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset();
      const timer = setTimeout(() => router.push('/'), 900);
      return () => clearTimeout(timer);
    }
  }, [state, router]);

  return (
    <form ref={formRef} action={formAction} className="grid" style={{ gap: 16 }}>
      <div>
        <label htmlFor="file"><strong>Excel-tiedosto</strong></label>
        <div style={{ height: 8 }} />
        <input id="file" name="file" type="file" accept=".xlsx" className="input" required />
      </div>
      <div className="notice">Tuonti korvaa nykyisen liidilistan ja päivittää myös tilaukset.</div>
      {state.message ? <div className={state.ok ? 'success' : 'notice'}>{state.message}</div> : null}
      <div>
        <button className="button" type="submit" disabled={pending}>{pending ? 'Tuodaan...' : 'Tuo tiedosto'}</button>
      </div>
    </form>
  );
}
