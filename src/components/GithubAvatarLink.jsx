import React, { PropTypes } from 'react';

import Tooltip from './Tooltip.jsx';

const GITHUB_URL = 'https://github.com/';

const GithubAvatarLink = ({
    githubLogin,
    height = 25,
    width = 25,
    tooltipPosition
}) => (
    <Tooltip
        position={tooltipPosition}
        text={githubLogin}
    >
        <a
            href={`${GITHUB_URL}${githubLogin}`}
            target="_blank"
        >
            <img
                src={`${GITHUB_URL}${githubLogin}.png`}
                style={{
                    borderRadius: 2,
                    height,
                    width
                }}
            />
        </a>
    </Tooltip>
);

GithubAvatarLink.propTypes = {
    githubLogin: PropTypes.string.isRequired,
    height: PropTypes.number,
    tooltipPosition: PropTypes.string.isRequired,
    width: PropTypes.number
};

export default GithubAvatarLink;