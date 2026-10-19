import AppShell from '../components/sidebar/AppShell';

export function DashboardLayout({ children, activePage, setPage, onLogout, title, subtitle, displayName }) {
  return (
    <AppShell
      activePage={activePage}
      setPage={setPage}
      onLogout={onLogout}
      title={title}
      subtitle={subtitle}
      displayName={displayName}
    >
      {children}
    </AppShell>
  );
}

export default DashboardLayout;
