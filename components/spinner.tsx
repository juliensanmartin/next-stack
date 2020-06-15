import { tertiary } from '../utils/colors';

const Spinner = () => {
  return (
    <div className="spinner">
      <style jsx>{`
        .spinner {
          display: inline-block;
          width: 50px;
          height: 50px;
        }
        .spinner:after {
          content: ' ';
          display: block;
          width: 30px;
          height: 30px;
          margin: 8px;
          border-radius: 50%;
          border: 4px solid ${tertiary};
          border-color: ${tertiary} transparent ${tertiary} transparent;
          animation: spinner 1.2s linear infinite;
        }
        @keyframes spinner {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
