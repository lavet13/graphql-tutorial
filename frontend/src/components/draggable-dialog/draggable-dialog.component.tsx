import { FC } from 'react';

import {
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
import { useReactiveVar } from '@apollo/client';
import { isDialogOpenVar } from '../../cache';

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
  handleAction: () => void;
};

const DraggableDialog: FC<DraggableDialogProps> = ({
  title,
  content,
  actionTitle,
  buttonColor,
  handleAction,
}) => {
  const open = useReactiveVar(isDialogOpenVar);

  const handleClickOpen = () => {
    isDialogOpenVar(true);
  };

  const handleClose = () => {
    isDialogOpenVar(false);
  };

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
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color='info' onClick={handleClose}>
            Отменить
          </Button>
          <Button onClick={handleAction} color={buttonColor}>
            {actionTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DraggableDialog;
