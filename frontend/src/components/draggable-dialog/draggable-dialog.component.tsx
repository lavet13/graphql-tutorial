import { FC } from 'react';

import {
  Alert,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  PaperProps,
} from '@mui/material';

import Draggable from 'react-draggable';
import { ApolloError, useReactiveVar } from '@apollo/client';
import { isDialogOpenVar } from '../../cache';
import { LoadingButton } from '@mui/lab';

const PaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

type DraggableDialogProps = {
  title: string;
  content: string;
  actionTitle: string;
  buttonColor: ButtonProps['color'];
  loading: boolean;
  error?: ApolloError;
  reset: () => void;
  handleAction: () => Promise<void>;
};

const DraggableDialog: FC<DraggableDialogProps> = ({
  title,
  content,
  actionTitle,
  buttonColor,
  handleAction,
  loading,
  error,
  reset,
}) => {
  const open = useReactiveVar(isDialogOpenVar);

  const handleClickOpen = () => {
    isDialogOpenVar(true);
  };

  const handleClose = () => {
    isDialogOpenVar(false);
  };

  const handleSomeAction = async () => {
    await handleAction();
    handleClose();
  };

  const handleReset = () => reset();

  return (
    <>
      <Button
        variant='contained'
        size='large'
        color={buttonColor}
        onClick={handleClickOpen}
      >
        {actionTitle}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'
      >
        <DialogTitle style={{ cursor: 'move' }} id='draggable-dialog-title'>
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error ? (
              <Alert onClose={handleReset} severity='error'>
                Error message: {error.message}
              </Alert>
            ) : (
              content
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color='info' onClick={handleClose}>
            Отменить
          </Button>
          <LoadingButton
            loading={loading}
            onClick={handleSomeAction}
            color={buttonColor}
          >
            <span>{actionTitle}</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraggableDialog;
