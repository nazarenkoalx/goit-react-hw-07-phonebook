import { LineWave } from 'react-loader-spinner';
import { LoaderWrapper } from './Loading.styled';

export const Loading = () => {
  return (
    <LoaderWrapper>
      <LineWave
        height="200"
        width="200"
        color="#4fa94d"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrapper>
  );
};
