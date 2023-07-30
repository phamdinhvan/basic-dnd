import DraggableList from "./components/DraggableItemList";
import "./global.css";

function App() {
  const list = [
    {
      id: 1,
      alias: "a",
      name: "A",
    },
    {
      id: 1,
      alias: "b",
      name: "B",
    },
  ];

  const displayList = list.map((event) => {
    return (
      <div key={event.id} className="ellipsis tw-py-3 tw-w-full">
        {event.name}
      </div>
    );
  });

  return <DraggableList list={displayList} visible={true} active={true} />;
}

export default App;
