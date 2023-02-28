import { Subpage, SubpageProps } from "../subpageConfig";


const BorrowManagement: React.FC<SubpageProps> = (props) => {
  const { candle, } = props;
  const { routes, ...candleProps } = props;
  return (
    <div>
      {candle && <candle.Component {...candleProps} />}
    </div>
  )
}

export default BorrowManagement;

