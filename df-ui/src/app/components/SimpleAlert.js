
import { Dialog, DialogTitle, DialogContent, Button, DialogActions, DialogContentText } from "@mui/material"

export default function SimpleAlert(props) {

    return (
        <>
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                       {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {
                        "showCancel" in props && props.showCancel === true ?
                        <Button onClick={props.handleCancel}>
                            Cancel
                        </Button> : null
                    }
                    
                    <Button onClick={props.handleOkay} autoFocus>
                        Okay
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )
};