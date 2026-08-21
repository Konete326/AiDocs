import { useState, useEffect, useMemo } from 'react';
import { getOptionsForProject, parseCustomString, checkIncompatibility } from '../../utils/stackCompatibility';
import CustomStackOptionGroup from './CustomStackOptionGroup';
import CustomStackSidebar from './CustomStackSidebar';

export default function CustomStackBuilderPanel({ onSaveCustomStack, currentCustom, isUpdating, project }) {
  const options = useMemo(() => getOptionsForProject(project), [project]);
  const parsed = parseCustomString(currentCustom?.formattedValue);

  const [frontend, setFrontend] = useState(currentCustom?.frontend || parsed.frontend || options.frontends[0]);
  const [backend, setBackend] = useState(currentCustom?.backend || parsed.backend || options.backends[0]);
  const [database, setDatabase] = useState(currentCustom?.database || parsed.database || options.databases[0]);
  const [auth, setAuth] = useState(currentCustom?.auth || parsed.auth || options.auths[0]);

  useEffect(() => {
    if (currentCustom?.formattedValue) {
      const p = parseCustomString(currentCustom.formattedValue);
      if (p.frontend) setFrontend(p.frontend);
      if (p.backend) setBackend(p.backend);
      if (p.database) setDatabase(p.database);
      if (p.auth) setAuth(p.auth);
    } else {
      setFrontend(options.frontends[0]);
      setBackend(options.backends[0]);
      setDatabase(options.databases[0]);
      setAuth(options.auths[0]);
    }
  }, [currentCustom, options]);

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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch w-full my-1">
      <div className="lg:col-span-4 h-full">
        <CustomStackSidebar
          currentStack={currentStack}
          conflict={conflict}
          onApply={handleApply}
          isUpdating={isUpdating}
        />
      </div>

      <div className="lg:col-span-8 h-full neumorphic-card rounded-2xl p-3.5 sm:p-4 border border-[#CAD1DB] flex flex-col justify-between space-y-3">
        <CustomStackOptionGroup label="1. Frontend Layer" category="frontend" options={options.frontends} selectedValue={frontend} onSelect={setFrontend} currentStack={currentStack} />
        <CustomStackOptionGroup label="2. Backend Runtime & API" category="backend" options={options.backends} selectedValue={backend} onSelect={setBackend} currentStack={currentStack} />
        <CustomStackOptionGroup label="3. Database Engine & Persistence" category="database" options={options.databases} selectedValue={database} onSelect={setDatabase} currentStack={currentStack} />
        <CustomStackOptionGroup label="4. Authentication Strategy" category="auth" options={options.auths} selectedValue={auth} onSelect={setAuth} currentStack={currentStack} />
      </div>
    </div>
  );
}
