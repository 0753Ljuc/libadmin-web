import { SubpageProps } from "../subpageConfig";


const UserManagement: React.FC<SubpageProps> = (props) => {

  const { candle, } = props;
  const { routes, ...candleProps } = props;
  return (
    <div>
      {candle && <candle.Component {...candleProps} />}
    </div>
  )
}

export default UserManagement;