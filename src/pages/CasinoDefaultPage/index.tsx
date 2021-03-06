import {Fragment, h} from 'preact';
import styles from './index.scss';
import {Button} from '~/components/Button';
import {CONFIG} from '~/config';
import {Link, useHistory} from 'react-router-dom';
import {cls, linkToContract, useChainId} from '~/utils/common';
import {useDefaultAsyncLazyLoadSelector, useSigner} from '~/store/utils';
import {casinoActions} from '~/store/casino';


export function CasinoDefaultPage() {
  const history = useHistory();
  const signer = useSigner();
  const chainId = useChainId();

  const prizeMultiplier = useDefaultAsyncLazyLoadSelector(
    state => state.casino.prizeMultiplier,
    casinoActions.getPrizeMultiplier.start()
  );

  const handleOnClickContinue = () => {
    history.push('/casino/dashboard/guess');
  };

  const handleOnClickConnectWallet = () => {
    history.push('/connect-wallet');
  };

  return (
    <div className={styles.defaultPage}>
      <h1>Casino 'Honest 99'</h1>

      <div className={styles.rules}>
        <p>Choose a number between <b>0</b> and <b>99</b> and place a bid in <i>ETH</i></p>
        <p>If your guess was correct, get <b>x{prizeMultiplier.data ? prizeMultiplier.data : '66'}</b> of your bid</p>
        <p>Can't win more than <b>200</b> <i>ETH</i> <br/> or more than a half of the prize fund</p>
        <p><b>3%</b> fee per each prize is kept</p>
      </div>

      <p>
        <br/> <br/> No lies, check yourself <br/>

        <a href={linkToContract(CONFIG.casinoContractAddress[chainId], chainId)} target='_blank'>etherscan</a>
        , <a href={CONFIG.mainGithubUrl} target='_blank'>github</a>
        , <a href={CONFIG.discussionUrl} target='_blank'>twitter</a>
      </p>

      <div className={styles.buttonsWrapper}>
        {
          signer
            ? (
              <Fragment>
                <Button
                  onClick={handleOnClickContinue}
                  className={cls(styles.btn)}
                >
                  Continue
                </Button>
                <p>or <Link to='/connect-wallet'>disconnect wallet</Link></p>
              </Fragment>
            )
            : (
              <Fragment>
                <Button
                  onClick={handleOnClickConnectWallet}
                  className={cls(styles.btn)}
                >
                  Connect wallet
                </Button>
                <p>or <Link to='/casino/dashboard/guess'>continue</Link> in read-only mode</p>
              </Fragment>
            )
        }
      </div>
    </div>
  );
}