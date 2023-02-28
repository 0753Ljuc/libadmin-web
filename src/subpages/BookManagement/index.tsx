import { SubpageProps } from '../subpageConfig'



const BookManagement: React.FC<SubpageProps> = (props) => {
  const { candle, } = props;
  const { routes, ...candleProps } = props;
  return (
    <div>
      {candle && <candle.Component {...candleProps} />}
    </div>
  )
}

export default BookManagement;