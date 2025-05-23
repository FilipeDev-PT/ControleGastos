import "./container.css";

interface IContainerPopUps {
  children: React.ReactNode;
}

const ContainerPopUps: React.FC<IContainerPopUps> = ({ children }) => {
  return (
    <>
      <div className="ContainerPopUps">
        <div className="ContentPopUps">{children}</div>
      </div>
    </>
  );
};

export default ContainerPopUps;
