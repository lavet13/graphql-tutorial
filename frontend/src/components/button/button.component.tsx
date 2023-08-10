import {
  Button,
  ButtonBase,
  ButtonBaseProps,
  ButtonProps,
  CardActionArea,
  CardActionAreaProps,
  ListItemButton,
  ListItemButtonProps,
} from '@mui/material';
import {} from '@mui/material';

// for typescript to able to use component prop
const GenericButtonComponent = <C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>
) => {
  return <Button {...props}>{props.children}</Button>;
};

export const GenericButtonBaseComponent = <C extends React.ElementType>(
  props: ButtonBaseProps<C, { component?: C }>
) => {
  return <ButtonBase {...props}>{props.children}</ButtonBase>;
};

export const GenericCardActionArea = <C extends React.ElementType>(
  props: CardActionAreaProps<C, { component?: C }>
) => {
  return <CardActionArea {...props}>{props.children}</CardActionArea>;
};

export const GenericListItemButton = <C extends React.ElementType>(
  props: ListItemButtonProps<C, { component?: C }>
) => {
  return <ListItemButton {...props}>{props.children}</ListItemButton>;
};

export default GenericButtonComponent;
