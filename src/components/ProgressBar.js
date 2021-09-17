export default function ProgressBar({ progress }) {
  return (
    <div className="progress__bar">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
