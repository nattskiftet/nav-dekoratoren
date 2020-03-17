import React from 'react';
import { MenyNode } from '../../../../../../../../reducer/menu-duck';
import BEMHelper from '../../../../../../../../utils/bem';
import Listelement from '../Listelement';
import HoyreChevron from 'nav-frontend-chevron/lib/hoyre-chevron';

interface Props {
    minsideLenker: MenyNode;
    openMeny: (menyElement: MenyNode, ref: any) => void;
    className: string;
    tabIndex: boolean;
    test: any;
}

const Dittnavmeny = (props: Props) => {
    const cls = BEMHelper(props.className);

    const setMenu = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
        submeny: MenyNode,
        pointer: any
    ) => {
        event.preventDefault();
        props.openMeny(submeny, pointer);
    };

    return (
        <ul className={cls.element('meny', 'minsidelist')}>
            {props.minsideLenker.children.map(
                (menyElement: MenyNode, index: number) => {
                    return (
                        <a
                            className="lenke"
                            key={index}
                            href="https://nav.no"
                            onClick={event =>
                                setMenu(
                                    event,
                                    menyElement,
                                    props.test[index].current
                                )
                            }
                            ref={props.test[index]}
                            tabIndex={props.tabIndex ? 0 : -1}
                        >
                            <Listelement
                                className={cls.className}
                                classElement="text-element"
                            >
                                {menyElement.displayName}
                                <HoyreChevron />
                            </Listelement>
                        </a>
                    );
                }
            )}
        </ul>
    );
};

export default Dittnavmeny;
