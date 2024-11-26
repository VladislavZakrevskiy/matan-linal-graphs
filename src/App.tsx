import { Menu } from "./components/Menu";
import { Canvas } from "./view/Canvas";
import { Layout, Splitter } from "antd";

const App = () => {
  return (
    <Layout>
      <Splitter className="h-screen">
        <Splitter.Panel defaultSize={300} max={300} min={120}>
          <Menu />
        </Splitter.Panel>
        <Splitter.Panel>
          <Canvas />
        </Splitter.Panel>
      </Splitter>
    </Layout>
  );
};

export default App;
