import CreditScoreIcon from '@mui/icons-material/CreditScore';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import btc from '../../../images/coin-icons/bitcoin-cryptocurrency.svg';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import QuizIcon from '@mui/icons-material/Quiz';
import { Avatar } from '@mui/material';

export const minemenu = [
    {
        id: 1,
        name: 'Primary Certification',
        status: 'Not Verified',
        icon: <CreditScoreIcon style={{ color: '#009688', fontSize: 45 }} />,
        color: '#009688'
    },
    {
        id: 2,
        name: 'Advanced authentication',
        status: 'Not Verified',
        icon: <HowToRegIcon style={{ color: '#4a148c', fontSize: 45 }} />,
    },
    {
        id: 3,
        name: 'Transaction details',
        status: null,
        icon: <ReceiptIcon style={{ color: '#01579b', fontSize: 45 }} />,
    },
    {
        id: 4,
        name: 'Fast transaction',
        status: null,
        icon: <AssignmentIcon style={{ color: '#616161', fontSize: 45 }} />,
    },
    {
        id: 5,
        name: 'Contract position',
        status: null,
        icon: <AssignmentIcon style={{ color: '#616161', fontSize: 45 }} />,
    },
    {
        id: 6,
        name: 'Wallet Address',
        status: null,
        icon: <Avatar src={btc} />,
        color: '#616161'
    },
    {
        id: 7,
        name: 'Payment Method Management',
        status: null,
        icon: <AccountBalanceWalletIcon style={{ color: '#0091ea', fontSize: 45 }} />,
    },
    {
        id: 8,
        name: 'I want to share',
        status: null,
        icon: <ScreenShareIcon style={{ color: '#e65100', fontSize: 45 }} />,
    },
    {
        id: 9,
        name: 'Online Customer Service',
        status: null,
        icon: <SupportAgentIcon style={{ color: '#37474f', fontSize: 45 }} />,
    },
    {
        id: 10,
        name: 'Help Center',
        status: null,
        icon: <QuizIcon style={{ color: '#00b0ff', fontSize: 45 }} />,
    },
]