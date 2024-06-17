import "../blocks/WeatherCard.css";

function WeatherCard(props) {
  return (
    <div className="wthr-card wthr-card__card">
      <h1 className="wthr-card__temp">{props.temp}°F</h1>
      <div className="wthr-card__sun"></div>
    </div>
  );
}

export default WeatherCard;
