import React from 'react';
import BEMHelper from 'utils/bem';
import './MenylinjeKnapp.less';

interface Props {
    onClick?: () => void;
    isOpen: boolean;
    classname: string;
    id?: string;
    ariaLabel: string;
    children: React.ReactNode;
}

const MenylinjeKnapp = (props: Props) => {
    const { onClick, isOpen, classname, id, ariaLabel, children } = props;
    const cls = BEMHelper(classname);

    return (
        <button
            onClick={onClick}
            className={`menylinje-knapp ${cls.element('knapp')}`}
            id={id}
            aria-label={ariaLabel}
            aria-pressed={isOpen}
            aria-haspopup="true"
            aria-controls={classname}
            aria-expanded={isOpen}
        >
            <div
                className={`menylinje-knapp-visning ${cls.element(
                    'knapp-visning'
                )}`}
            >
                {children}
            </div>
        </button>
    );
};

export default MenylinjeKnapp;