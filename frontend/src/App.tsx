import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { Layout } from './components/layout';

// Pages
import Feed from './pages/feed';
import List from './pages/list';
import Timeline from './pages/timeline';
import Settings from './pages/settings';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="patchy-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/list" element={<List />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;