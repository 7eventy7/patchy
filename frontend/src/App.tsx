import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { AccentProvider } from './components/accent-provider';
import { Toaster } from './components/ui/toaster';
import { Layout } from './components/layout';

// Pages
import List from './pages/list';
import Timeline from './pages/timeline';
import Settings from './pages/settings';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="patchy-ui-theme">
      <AccentProvider defaultAccent="purple" storageKey="patchy-ui-accent">
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Timeline />} />
              <Route path="/list" element={<List />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
          <Toaster />
        </Router>
      </AccentProvider>
    </ThemeProvider>
  );
}

export default App;