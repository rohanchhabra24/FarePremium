import MainLayout from "./layout/MainLayout"; // optional, you can remove if not using
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <MainLayout>
      <AppRoute></AppRoute>
    </MainLayout>
  );
}

export default App;
