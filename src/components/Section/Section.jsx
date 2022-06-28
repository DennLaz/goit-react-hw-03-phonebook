import PropTypes from "prop-types";

import styles from './section.module.css'

const Section = ({title, children}) => {
    return (
        <div className={styles.wrap}>
            <h2>{title}</h2>
            {children}
        </div>
    )

}

Section.defaultProps = {
    title: '',
}

Section.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
}

export default Section;