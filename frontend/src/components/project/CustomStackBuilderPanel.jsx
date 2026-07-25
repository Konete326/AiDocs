import { useState, useEffect } from 'react';
import { FRONTENDS, BACKENDS, DATABASES, AUTHS, parseCustomString, checkIncompatibility } from '../../utils/stackCompatibility';
import CustomStackOptionGroup from './CustomStackOptionGroup';
import CustomStackSidebar from './CustomStackSidebar';

export default function CustomStackBuilderPanel({ onSaveCustomStack, currentCustom, isUpdating }) {
  const parsed = parseCustomString(currentCustom?.formattedValue);
  const [frontend, setFrontend] = useState(currentCustom?.frontend || parsed.frontend || FRONTENDS[0]);
  const [backend, setBackend] = useState(currentCustom?.backend || parsed.backend || BACKENDS[0]);
  const [database, setDatabase] = useState(currentCustom?.database || parsed.database || DATABASES[0]);
  const [auth, setAuth] = useState(currentCustom?.auth || parsed.auth || AUTHS[0]);

  useEffect(() => {
    if (currentCustom?.formattedValue) {
      const p = parseCustomString(currentCustom.formattedValue);
      if (p.frontend) setFrontend(p.frontend);
      if (p.backend) setBackend(p.backend);
      if (p.database) setDatabase(p.database);
      if (p.auth) setAuth(p.auth);
    }
  }, [currentCustom]);

  const currentStack = { frontend, backend, database, auth };
  const conflict = checkIncompatibility('all', null, frontend, backend, database, auth);

  const handleApply = () => {
    if (conflict) return;
    onSaveCustomStack({
      frontend, backend, database, auth,
      formattedValue: `Custom Stack: ${frontend} Frontend + ${backend} Backend + ${database} Database + ${auth}`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch w-full my-2">
      <div className="lg:col-span-4 h-full">
        <CustomStackSidebar
          currentStack={currentStack}
          conflict={conflict}
          onApply={handleApply}
          isUpdating={isUpdating}
        />
      </div>

      <div className="lg:col-span-8 h-full liquid-glass-strong rounded-2xl p-3 sm:p-4 border border-white/15 flex flex-col justify-between space-y-3">
        <CustomStackOptionGroup label="Frontend Layer" category="frontend" options={FRONTENDS} selectedValue={frontend} onSelect={setFrontend} currentStack={currentStack} />
        <CustomStackOptionGroup label="Backend Runtime & API" category="backend" options={BACKENDS} selectedValue={backend} onSelect={setBackend} currentStack={currentStack} />
        <CustomStackOptionGroup label="Database Engine" category="database" options={DATABASES} selectedValue={database} onSelect={setDatabase} currentStack={currentStack} />
        <CustomStackOptionGroup label="Authentication Strategy" category="auth" options={AUTHS} selectedValue={auth} onSelect={setAuth} currentStack={currentStack} />
      </div>
    </div>
  );
}
