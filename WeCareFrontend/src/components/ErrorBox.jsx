

const ErrorBox = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
      <div className="bg-white p-4 rounded shadow text-center" style={{ minWidth: '300px' }}>
        <p className="mb-3 text-danger fw-bold">{message}</p>
        <button className="btn btn-danger" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default ErrorBox;
